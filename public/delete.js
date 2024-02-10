async function deleteFunc(blogId) {
  try {
    if (confirm("Are you sure you want to delete this post? ")) {
      const res = await fetch(
        `http://localhost:3000/api/blog/${blogId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (res.ok) alert("The post was successfully deleted");
      else alert("Uh oh! There was an error deleting your post");
      window.location.href = "http://localhost:3000/api/blogs"; 
    }
  } catch (err) {
    console.log(err);
  }
}
