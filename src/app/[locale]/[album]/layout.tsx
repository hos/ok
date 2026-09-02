import React from "react";
import albums from "src/data/albums.json";

export function generateStaticParams() {
  return albums.map((album) => ({ album: album.path }));
}

export default function AlbumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
