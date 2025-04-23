import { useRouter } from "next/router";

export default function Help() {
  const router = useRouter();
  const { slug } = router.query;

  let content;
  if (!slug || slug.length === 0) {
    content = (
      <div>
        <h1>Help Center</h1>
        <p>Welcome to the Movie House Help Center.</p>
      </div>
    );
  } else if (slug[0] === "faqs") {
    content = (
      <div>
        <h1>FAQs</h1>
        <p>Frequently asked questions about Movie House.</p>
      </div>
    );
  } else if (slug[0] === "contact") {
    content = (
      <div>
        <h1>Contact Us</h1>
        <p>Contact us at support@moviehouse.com.</p>
      </div>
    );
  } else if (slug[0] === "privacy") {
    content = (
      <div>
        <h1>Privacy Policy</h1>
        <p>Our privacy policy details how we handle your data.</p>
      </div>
    );
  } else {
    content = (
      <div>
        <h1>Page Not Found</h1>
        <p>The requested help page was not found.</p>
      </div>
    );
  }

  return <div>{content}</div>;
}
