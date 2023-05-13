import { useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import PostList from "../../components/posts/PostList";
import "./category.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsCategory } from "../../redux/apiCalls/postApiCall";

const PostCategoryPage = () => {
  const { postCate } = useSelector(state => state.posts)
  const { category } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPostsCategory(category))
    window.scrollTo(0,0)
  },[])
    return ( 
        <>
            <section className="category">
              {postCate.length > 0 ? 
              <>
              <h1 className="category-title">{category}</h1>
              <PostList posts={postCate}/>
              </>
              :
              <>
              <h1 className="category-title">Posts with {category} not found</h1>
              </>
              }
            </section>
        </>
     ); 
}
 
export default PostCategoryPage;