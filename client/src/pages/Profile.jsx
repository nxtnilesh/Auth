import { useEffect, useState } from "react";
import { fetchProfile } from "../api/auth";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await fetchProfile();
      setProfile(data.data);
    };

    loadProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
};

export default Profile;
