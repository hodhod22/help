import { useGetAllMessagesQuery } from "../../features/api/userApi";
import { useTranslation } from "react-i18next";

export default function AdminMessages() {
  const { t } = useTranslation();
  const { data: messages, isLoading } = useGetAllMessagesQuery();

  if (isLoading) return <p>{t("common.loading")}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t("admin.messages")}</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("contact.name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("contact.email")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("contact.phone")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("contact.company")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("contact.message")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("common.date")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages?.map((msg) => (
              <tr key={msg._id}>
                <td className="px-6 py-4">{msg.name}</td>
                <td className="px-6 py-4">{msg.email}</td>
                <td className="px-6 py-4">{msg.phone}</td>
                <td className="px-6 py-4">{msg.company || "-"}</td>
                <td className="px-6 py-4">{msg.message}</td>
                <td className="px-6 py-4">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
