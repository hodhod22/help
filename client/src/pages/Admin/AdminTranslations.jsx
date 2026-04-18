import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function AdminTranslations() {
  const { t, i18n } = useTranslation();
  const [translations, setTranslations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({ sv: "", en: "", ar: "" });

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/translations`);
    setTranslations(res.data);
  };

  const handleEdit = (trans) => {
    setEditing(trans.key);
    setEditValues({ sv: trans.sv, en: trans.en, ar: trans.ar });
  };

  const handleSave = async (key) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/translations/${key}`,
      editValues,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    setEditing(null);
    fetchTranslations();
    i18n.addResourceBundle(
      i18n.language,
      "translation",
      { [key]: editValues[i18n.language] },
      true,
      true,
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t("admin.editTranslations")}</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Key
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Svenska
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                English
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                العربية
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {t("admin.actions")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {translations.map((trans) => (
              <tr key={trans.key}>
                <td className="px-6 py-4 font-mono text-sm">{trans.key}</td>
                {editing === trans.key ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        value={editValues.sv}
                        onChange={(e) =>
                          setEditValues({ ...editValues, sv: e.target.value })
                        }
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        value={editValues.en}
                        onChange={(e) =>
                          setEditValues({ ...editValues, en: e.target.value })
                        }
                        className="border rounded p-1 w-full"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        value={editValues.ar}
                        onChange={(e) =>
                          setEditValues({ ...editValues, ar: e.target.value })
                        }
                        className="border rounded p-1 w-full"
                        dir="rtl"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleSave(trans.key)}
                        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Spara
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Avbryt
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{trans.sv}</td>
                    <td className="px-6 py-4">{trans.en}</td>
                    <td className="px-6 py-4" dir="rtl">
                      {trans.ar}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(trans)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        {t("admin.edit")}
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
