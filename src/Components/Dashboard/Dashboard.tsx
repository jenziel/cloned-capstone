import Loading from "Components/Loading/Loading";
import MeetingsContainer from "Components/MeetingsContainer/MeetingsContainer";
import Profile from "Components/Profile/Profile";
import RequestMeetingForm from "Components/RequestMeetingForm/RequestMeetingForm";
import { getMeetingsByUser, getSingleUser } from "apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrentUser } from "types";
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import './Dashboard.css'

interface CurrentUserProps {
  currentUser: CurrentUser;
}

function Dashboard({ currentUser }: CurrentUserProps) {
  const { id } = useParams();
  const [userMeetings, setUserMeetings] = useState([]);
  const [isCurrentUser, setIsCurrentUser] = useState<Boolean>(true);
  const [dashboardData, setDashboardData] = useState<CurrentUser>();
  const userIdFromUrl = Number(id);
  const isCurrentUserDashboard = userIdFromUrl === Number(currentUser.id);

  useEffect(() => {
    if (!isCurrentUserDashboard) {
      getSingleUser(userIdFromUrl)
        .then((data) => {
          setDashboardData(data.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }

    getMeetingsByUser(currentUser.id)
      .then((meetings) => {
        setUserMeetings(meetings.data);
      })
      .catch((error) => {
        console.error("Error fetching meetings:", error);
      });

    setIsCurrentUser(isCurrentUserDashboard);
  }, [userIdFromUrl]);

  return (
    <div className="dashboard-wrapper">
      {!isCurrentUser && dashboardData ? (
        <div className="other-user-dash">
          <ProfileHeader currentUser={dashboardData} />
          <Profile currentUser={dashboardData} />
          <RequestMeetingForm currentUserId={currentUser.id} />
        </div>
      ) : null}

      {isCurrentUser && (
        <div className="current-user-dash">
          <ProfileHeader currentUser={currentUser} />
          <Profile currentUser={currentUser} />
          <MeetingsContainer meetings={userMeetings} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
