import PostList from "../../components/posts/PostList";
import "./home.css";
import Sidebar from "../../components/slide/SideBar";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
import { useEffect } from "react";


const HomePage = () => {
  const {posts} = useSelector(state => state.posts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPosts(1))
  },[])
  return (
    <>
      <section className="home">
        <div className="home-hero-header">
          <div className="home-hero-header-layout">
            <h1 className="home-title">Welcome to Blog</h1>
          </div>
        </div>
        <div className="home-latest-post">Latest Posts</div>
        <div className="home-container">
          <PostList posts={posts} />
          <Sidebar />
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
