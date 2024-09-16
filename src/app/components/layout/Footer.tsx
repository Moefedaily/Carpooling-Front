export default function Footer() {
  return (
    <footer className="bg-primary py-6">
      <div className="container mx-auto text-center">
        <p className="text-secondary font-roboto">
          &copy; {new Date().getFullYear()} WeeGoo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
