import {Link} from "react-router-dom"


const PostItem = ({post, username,userId}) => {
    const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`
    return ( 
        <>
            <div className="post-item">
                <div className="post-item-image-wrapper">
                    <img src={post?.image?.url} alt="" className="post-item-image"/>
                </div>
                <div className="post-item-info-wrapper">
                    <div className="post-item-info">
                        <div className="post-item-author">
                            <strong>Aithour:</strong>
                               <Link className="post-item-username" to={profileLink}>{username ? username : post?.user?.username}</Link>
                        </div>
                        <div className="post-item-date">
                            {new Date(post?.createdAt).toDateString()}
                        </div>
                    </div>
                        <div className="post-item-details">
                            <h4 className="post-item-title">{post?.title}</h4>
                            <Link className="post-item-category" to={`/post/categories/${post?.category}`}>{post?.category}</Link>
                            <p className="post-item-description">
                                {post?.description}
                            </p>
                            <Link className="post-item-link" to={`/post/details/${post?._id}`}>
                                Read More...
                            </Link>
                        </div>
                </div>
            </div>
        </>
     );
}
 
export default PostItem;