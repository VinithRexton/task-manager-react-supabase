import { supabase } from "./supabase";

// Upload task images
export async function uploadImage(file, userId) {
  if (!file) return null;

  const extension = file.name.split(".").pop();
  const fileName = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("task-images")
    .upload(fileName, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("task-images")
    .getPublicUrl(fileName);

  return publicUrl;
}

// Upload profile images
export async function uploadProfileImage(file, userId) {
  if (!file) return null;

  const extension = file.name.split(".").pop();
  const fileName = `${userId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("profile-images")
    .upload(fileName, file);

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("profile-images")
    .getPublicUrl(fileName);

  return publicUrl;
}