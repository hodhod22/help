import {
  useGetAllMessagesQuery,
  useGetAllUsersQuery,
} from "../../features/api/userApi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { data: messages } = useGetAllMessagesQuery();
  const { data: users } = useGetAllUsersQuery();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t("admin.dashboard")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold">{t("admin.totalMessages")}</h2>
          <p className="text-3xl font-bold text-blue-600">
            {messages?.length || 0}
          </p>
          <Link
            to="/admin/messages"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            {t("admin.viewAll")}
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold">{t("admin.totalUsers")}</h2>
          <p className="text-3xl font-bold text-green-600">
            {users?.length || 0}
          </p>
          <Link
            to="/admin/users"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            {t("admin.manageUsers")}
          </Link>
        </div>
      </div>
    </div>
  );
}
