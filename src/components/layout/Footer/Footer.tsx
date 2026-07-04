export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_wrapp">
        <p className="footer_slog">
          Разработка <span>сайтов</span> под ключ
        </p>
        <p className="footer_copy">
          Все права защищены | {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
