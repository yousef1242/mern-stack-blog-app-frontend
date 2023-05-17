import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/slide/SideBar";
import { Link } from "react-router-dom";
import "./home.css";
import LoaderPosts from "../../components/loader-posts/loaderPosts";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(1)).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      <section className="home">
        <div className="home-hero-header">
          <div className="home-hero-header-layout">
            <h1 className="home-title">Welcome to Blog</h1>
          </div>
        </div>
        <div className="home-latest-post">Latest Posts</div>
        <div className={loading ? "d-block" : "home-container"}>
          {loading ? (
            <LoaderPosts/>
          ) : (
            <>
              <PostList posts={posts} />
              <Sidebar />
            </>
          )}
        </div>
        <div className="home-see-post-link">
          <Link to={"/posts"} className="home-link">
            See All Posts
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;