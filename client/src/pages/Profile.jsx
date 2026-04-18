import { useSelector } from "react-redux";
import {
  useGetUserMessagesQuery,
  useUpdateProfileMutation,
} from "../features/api/userApi";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { data: messages, isLoading: messagesLoading } =
    useGetUserMessagesQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const [name, setName] = useState(user?.name || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ name }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t("profile.title")}</h1>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {t("profile.editProfile")}
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={updating}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {updating ? t("profile.saving") : t("profile.save")}
          </button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("profile.myMessages")}
        </h2>
        {messagesLoading ? (
          <p>{t("common.loading")}</p>
        ) : messages?.length === 0 ? (
          <p>{t("profile.noMessages")}</p>
        ) : (
          <div className="space-y-4">
            {messages?.map((msg) => (
              <div key={msg._id} className="border p-4 rounded">
                <p className="font-medium">{msg.message}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <p>📧 {msg.email}</p>
                  <p>📞 {msg.phone}</p>
                  <p>📅 {new Date(msg.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
