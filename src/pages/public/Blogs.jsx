// import React, { useState, useEffect } from "react";
// import {
//   FaSearch,
//   FaCalendarAlt,
//   FaExternalLinkAlt,
// } from "react-icons/fa";
// import { getAllPublishedBlogs } from "../../api/axiosService/userSignUpService";
// import LayoutComponent from "../../components/layouts/LayoutComponent";

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const [activeTab, setActiveTab] = useState("Latest");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await getAllPublishedBlogs();
//       setBlogs(res?.data?.data || []);
//     } catch (error) {
//       console.log("Error fetching blogs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredBlogs = blogs
//     .filter((blog) =>
//       blog?.title?.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) =>
//       activeTab === "Latest"
//         ? new Date(b.createdAt) - new Date(a.createdAt)
//         : new Date(a.createdAt) - new Date(b.createdAt)
//     );

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
      
//       {/* HEADER */}
//       <div className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm">
//         <LayoutComponent />
//       </div>

//       <div className="flex-grow pt-32 pb-12 max-w-7xl mx-auto px-4">

//         {/* TITLE */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Blogs & Articles
//           </h1>

//           {/* SEARCH */}
//           <div className="max-w-xl mx-auto relative mt-6">
//             <FaSearch className="absolute top-4 left-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search blogs..."
//               className="w-full pl-10 pr-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>

//           {/* FILTER */}
//           <div className="flex justify-center mt-6">
//             <div className="bg-gray-100 p-1 rounded-lg inline-flex shadow-sm">
//               {["Latest", "Oldest"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-2 rounded-md transition ${
//                     activeTab === tab
//                       ? "bg-white text-purple-700 shadow font-semibold"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* LOADING */}
//         {loading && (
//           <div className="text-center text-gray-500 text-lg mt-10">
//             Loading blogs...
//           </div>
//         )}

//         {/* EMPTY STATE */}
//         {!loading && filteredBlogs.length === 0 && (
//           <div className="text-center text-gray-500 text-lg mt-10">
//             No blogs found 😔
//           </div>
//         )}

//         {/* BLOG LIST */}
//         <div className="space-y-8">
//           {!loading &&
//             filteredBlogs.map((blog) => (
//               <div
//                 key={blog._id}
//                 className="bg-white rounded-2xl shadow-sm hover:shadow-xl border flex flex-col md:flex-row overflow-hidden transition duration-300"
//               >
//                 {/* IMAGE */}
//                 <div className="md:w-1/3">
//                   <img
//                     src={
//                       blog.coverImage ||
//                       "https://via.placeholder.com/600x400"
//                     }
//                     alt={blog.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 <div className="flex-1 p-6 flex flex-col">

//                   {/* CATEGORY */}
//                   <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit">
//                     {blog.category}
//                   </span>

//                   {/* DATE */}
//                   <div className="flex items-center text-sm text-gray-500 mb-2">
//                     <FaCalendarAlt className="mr-2 text-purple-600" />
//                     {new Date(blog.createdAt).toDateString()}
//                   </div>

//                   {/* TITLE */}
//                   <h2 className="text-2xl font-bold mb-3 text-gray-800">
//                     {blog.title}
//                   </h2>

//                   {/* CONTENT PREVIEW */}
//                   <p className="text-gray-600 line-clamp-3 mb-4">
//                     {blog.content?.substring(0, 150)}...
//                   </p>

//                   {/* AUTHOR */}
//                   <div className="flex items-center gap-3 mt-auto mb-4">
//                     <img
//                       src={
//                         blog.authorPhoto ||
//                         "https://via.placeholder.com/50"
//                       }
//                       alt="author"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="text-sm font-semibold text-gray-800">
//                         {blog.authorName}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {blog.authorRole}
//                       </p>
//                     </div>
//                   </div>

//                   {/* BUTTON */}
//                   <button
//                     onClick={() => setSelectedBlog(blog)}
//                     className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition w-fit"
//                   >
//                     Read Full Article
//                     <FaExternalLinkAlt />
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       {/* MODAL */}
//       {selectedBlog && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[150]">
//           <div className="bg-white max-w-4xl w-full p-8 rounded-xl overflow-y-auto max-h-[90vh] shadow-xl relative">
            
//             <button
//               onClick={() => setSelectedBlog(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
//             >
//               ✕
//             </button>

//             <h2 className="text-3xl font-bold mb-4 text-gray-800">
//               {selectedBlog.title}
//             </h2>

//             <img
//               src={selectedBlog.coverImage}
//               alt="blog"
//               className="w-full mb-6 rounded-lg"
//             />

//             <div className="flex items-center gap-3 mb-6">
//               <img
//                 src={selectedBlog.authorPhoto}
//                 alt="author"
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-semibold">{selectedBlog.authorName}</p>
//                 <p className="text-sm text-gray-500">
//                   {selectedBlog.authorRole}
//                 </p>
//               </div>
//             </div>

//             <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
//               {selectedBlog.content}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blogs;


import React, { useState, useEffect } from "react";
import { getAllPublishedBlogs } from "../../api/axiosService/userSignUpService";
import LayoutComponent from "../../components/layouts/LayoutComponent";

const bgColors = [
  "bg-white",
  "bg-purple-50",
  "bg-indigo-50",
  "bg-pink-50",
  "bg-blue-50",
];

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getAllPublishedBlogs();
      setBlogs(res?.data?.data || []);
    } catch (error) {
      console.log("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* FIXED HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <LayoutComponent />
      </div>

      {/* CONTENT WRAPPER (Header height fix added) */}
      <div className="pt-40 pb-20 px-4">

        <div className="max-w-5xl mx-auto">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-gray-800 mb-14 text-center">
            All Blog Posts
          </h1>

          {/* LOADING */}
          {loading && (
            <p className="text-center text-gray-500">Loading blogs...</p>
          )}

          {/* EMPTY */}
          {!loading && blogs.length === 0 && (
            <p className="text-center text-gray-500">No blogs available.</p>
          )}

          {/* BLOG CARDS */}
          <div className="space-y-12">
            {!loading &&
              blogs.map((blog, index) => (
                <div
                  key={blog._id}
                  className={`${bgColors[index % bgColors.length]} 
                  rounded-3xl p-8 shadow-sm hover:shadow-xl 
                  transition duration-300`}
                >
                  <div className="grid md:grid-cols-3 gap-8 items-center">

                    {/* SMALLER IMAGE */}
                    <div className="md:col-span-1">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-56 object-cover rounded-2xl"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="md:col-span-2">

                      {/* CATEGORY + DATE */}
                      <p className="text-sm text-gray-500 mb-3">
                        <span className="font-semibold text-gray-700">
                          {blog.category}
                        </span>{" "}
                        -{" "}
                        {new Date(blog.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>

                      {/* TITLE */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {blog.title}
                      </h2>

                      {/* DESCRIPTION */}
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {blog.content?.substring(0, 160)}...
                      </p>

                      {/* AUTHOR */}
                      <div className="flex items-center gap-4">
                        <img
                          src={blog.authorPhoto}
                          alt="author"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {blog.authorName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {blog.authorRole}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Blogs;