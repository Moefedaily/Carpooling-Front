export default function Footer() {
  return (
    <footer className="bg-bgHero py-6">
      <div className="container mx-auto text-center">
        <p className="text-secondary font-merriweather font-bold">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-primary">WEEGOO.</span> All rights reserved.
        </p>
      </div>
    </footer>
  );
}
