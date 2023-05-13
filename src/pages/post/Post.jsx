import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/pagination";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/slide/SideBar";
import "./postPage.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchPostsCount } from "../../redux/apiCalls/postApiCall";

const POST_PER_PAGE = 3;

const PostPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { postCount, posts } = useSelector((state) => state.posts);
  const pages = Math.ceil(postCount / POST_PER_PAGE);

  useEffect(() => {
      dispatch(fetchPosts(currentPage));
      window.scrollTo(0, 0);
    }, [currentPage]);
    
    useEffect(() => {
      dispatch(fetchPostsCount());
    }, []);
  return (
    <>
      <section className="post-page">
        <PostList posts={posts} />
        <Sidebar/>
      </section>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default PostPage;
