const Header = () => {
  return (
    <header className="w-full py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent">
            <img src="/1.png" alt="Berasku Logo" className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Berasku - Identifikasi Jenis Beras
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unggah foto beras untuk mengetahui jenisnya secara otomatis menggunakan teknologi AI oleh Berasku
        </p>
      </div>
    </header>
  );
};

export default Header;
