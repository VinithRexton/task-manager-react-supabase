import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../contexts/AuthContext";
import { getProfile, updateProfile } from "../services/profileService";
import { supabase } from "../services/supabase";

function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [saving, setSaving] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  async function loadProfile() {
    try {
      const data = await getProfile(user.id);

      if (data) {
        setProfile(data);
        setFullName(data.full_name || "");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile.");
    }
  }

  async function handleSave() {
    try {
      setSaving(true);

      const updated = await updateProfile(
        {
          ...user,
          user_metadata: {
            ...user.user_metadata,
            full_name: fullName,
          },
        },
        selectedFile,
        fullName
      );

      setProfile(updated);
      setSelectedFile(null);

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  async function handlePasswordUpdate() {
    if (!newPassword || !confirmPassword) {
      toast.warning("Please enter your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      toast.warning("Password must be at least 6 characters.");
      return;
    }

    try {
      setUpdatingPassword(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Password updated successfully!");

      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setUpdatingPassword(false);
    }
  }

  const avatar =
    profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      fullName || "User"
    )}`;

  return (
    <main className="profile-page">
      <div className="profile-card">
        <h1>Profile Settings</h1>

        <div className="profile-avatar-wrapper">
          <label style={{ cursor: "pointer" }}>
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : avatar
              }
              className="profile-avatar"
              alt="Profile"
            />

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setSelectedFile(e.target.files?.[0] || null)
              }
            />
          </label>
        </div>

        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={user?.email || ""}
            disabled
          />
        </div>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        <div className="security-card">
          <h2>Security</h2>

          <div className="form-group">
            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className="save-btn"
            onClick={handlePasswordUpdate}
            disabled={updatingPassword}
          >
            {updatingPassword
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;