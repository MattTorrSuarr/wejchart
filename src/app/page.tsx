import Image from "next/image";
import Link from "next/link"; // Import Link

export default function Home() {
  return (
    <div>
      <div className="header">
        <nav>
          <div className="header-content">
            <h2>wejchart</h2>
          </div>
        </nav>
      </div>
      <div className="mtext"> {/* Added container for text and image */}
        <div className="mtext-content">
          <div className="text-section">
            <h1>
              make quality charts with <span className="gradient-text">wejchart</span>
            </h1>
            <p className="ptwt">
              change the way you make charts with wejchart 
            </p>
            <Link href="/ai"> {/* Update the href with the correct path */}
              <button className="btn6">Generate Charts</button>
            </Link>
            <button className="btn5">Subscribe</button>
          </div>
          <div className="image-section">
            <Image
              src="/pro.png" // Replace with the correct path to your image
              alt="Chart Example"
              width={600} // Adjust width as needed
              height={400} // Adjust height as needed
              className="mtext-image"
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <p>© 2022 wejchart. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </div>
  );
}
