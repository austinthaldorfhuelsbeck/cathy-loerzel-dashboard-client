// Dependencies
import { useState, useEffect } from "react";

// API methods
import { listBlogs } from "../../utils/api";
import ItemsList from "../Lists/ItemsList";

export default function BlogsGrid() {

  // Load all blogs

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function loadBlogs() {
      const response = await listBlogs()
      setBlogs(response.data)
    }
    loadBlogs()
  }, []);

  return <ItemsList selectedList="blogs" items={blogs} preview={false} />;
}
