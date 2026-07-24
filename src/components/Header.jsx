import { useEffect, useState } from "react";
import { FaTasks, FaPlus, FaCamera } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { getProfile, updateProfile } from "../services/profileService";
import { useNavigate } from "react-router-dom";


function Header({ onAdd }) {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    loadProfile();
  }, [user]);

  async function loadProfile() {
    try {
      const data = await getProfile(user.id);

      if (data) {
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAvatarUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const updatedProfile = await updateProfile(user, file);

      setProfile(updatedProfile);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  const avatar =
    profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.user_metadata?.full_name || "User"
    )}&background=2563eb&color=fff`;

  return (
    <header className="app-header">
      <div className="header-content">

        <div className="header-text">
          <h1>
            <FaTasks className="header-icon" />
            Todo List For Muttai!
          </h1>

          <p>Planner to succeed!!</p>
        </div>

        {user && (
          <div className="header-right">

            <div className="user-profile">

              <label className="avatar-wrapper">

                <img
                  src={avatar}
                  alt="Profile"
                  className="user-avatar"
                />

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleAvatarUpload}
                />

                <div className="avatar-overlay">
                  <FaCamera />
                </div>

              </label>

              <div className="user-details">
                <h4>{profile?.full_name || user.user_metadata?.full_name}</h4>
                <p>{user.email}</p>

                {uploading && (
                  <small>Uploading...</small>
                )}
              </div>

            </div>

            <div className="header-actions">

              <button
                className="primary-btn"
                onClick={onAdd}
              >
                <FaPlus />
                <span>New Task</span>
              </button>

              <button
  className="secondary-btn"
  onClick={() => navigate("/profile")}
>
  Profile
</button>

              <button
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>

            </div>

          </div>
        )}

      </div>
    </header>
  );
}

export default Header;