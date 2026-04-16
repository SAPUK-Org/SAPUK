export default function FacebookEmbed() {
  return (
    <div className="flex justify-center my-8">
      <div className="overflow-hidden rounded-lg shadow-md max-w-full">
        <iframe
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FSuicideAPUK%2Fposts%2Fpfbid0eQCmwPTM9821LxdyT8XU4j9XxZxpfi7YX3CC7NiSu1MM3bqYoyK45TFddr3q6Eztl&show_text=true&width=500"
          width="700"
          height="220"
          style={{ border: "none", overflow: "hidden" }}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="max-w-full"
        ></iframe>
      </div>
    </div>
  );
}
