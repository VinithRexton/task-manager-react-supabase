import { supabase } from "./supabase";
import { uploadProfileImage } from "./storageService";

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return data;
}
export async function updateProfile(user, file, fullName) {
    let avatarUrl = null;
  
    if (file) {
      avatarUrl = await uploadProfileImage(file, user.id);
    } else {
      const current = await getProfile(user.id);
      avatarUrl = current?.avatar_url || null;
    }
  
    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
      })
      .select()
      .single();
  
    if (error) throw error;
  
    return data;
  }