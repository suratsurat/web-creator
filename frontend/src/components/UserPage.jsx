
export default function UserPage({ data }) {
  const theme = data.theme;
  return (
    <div style={{ fontFamily: theme.font, color: theme.primaryColor }} className={`min-h-screen p-4 ${theme.animation}`}>
      <h1 className="text-3xl font-bold">{data.business_name}</h1>
      <h2 className="text-lg">Owner: {data.owner_name}</h2>
      <p>📞 {data.mobile_number} | 📍 {data.location}</p>
      <p>✉️ {data.email}</p>
      <p className="mt-4">Specialities: {data.our_specialities}</p>
    </div>
  );
}