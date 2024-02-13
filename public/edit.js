async function editFunc(updatedDocument) {
  try {
      const res = await fetch(
        `http://localhost:3000/api/blog/${updatedDocument.id}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedDocument),
        }
      );
      if (res.ok) alert("The post was successfully updated");
      else alert("Uh oh! There was an error updating your post");
  } catch (err) {
    console.log(err);
  }
  window.location.href = `http://localhost:3000/api/blog/${updatedDocument.id}`;
}
