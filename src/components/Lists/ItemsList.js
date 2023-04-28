// Components
import LoadMoreButton from "../Buttons/LoadMoreButton"
import BlogCard from "../Cards/BlogCard"
import EventCard from "../Cards/EventCard"

export default function ItemsList({ selectedList, items, preview }) {
  
  // If 'preview' is true,
  // only preview the first four items
  // and render a "load more..." button
  if (preview && items.length > 4) {
    items = items.slice(0, 4)
  }
  
  // Choose the appropriate list to render
  return (
    <>
      {items.map((item, i) => (
        selectedList === "blogs" ? 
        <BlogCard blog={item} key={i} /> : 
        <EventCard event={item} key={i} />
      ))}
      {preview && <LoadMoreButton url={selectedList} />}
    </>
  )
}
