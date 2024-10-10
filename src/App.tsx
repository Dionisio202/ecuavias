

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold underline mb-4">Responsive Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-sm text-gray-700">John Doe</td>
              <td className="px-4 py-2 text-sm text-gray-700">john.doe@example.com</td>
              <td className="px-4 py-2 text-sm text-gray-700">Admin</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-sm text-gray-700">Jane Smith</td>
              <td className="px-4 py-2 text-sm text-gray-700">jane.smith@example.com</td>
              <td className="px-4 py-2 text-sm text-gray-700">User</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
