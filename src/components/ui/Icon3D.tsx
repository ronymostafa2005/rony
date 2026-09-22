import { memo } from 'react';

// ─────────────────────────────────────────────────────────────
// Icon3D — real 3D-rendered icons used across the whole
// portfolio. Source: Microsoft Fluent Emoji "3D" set (MIT
// license), served via jsDelivr CDN. Brand marks (GitHub /
// LinkedIn) fall back to devicon SVGs so they stay recognizable
// inside 3D-styled tiles.
//
// Usage:
//   <Icon3D name="Rocket" size={28} float />
//   <Icon3D name="Graduation cap" size={26} />
//   <Icon3D devicon="github/github-original" size={18} invert />
// ─────────────────────────────────────────────────────────────
const FLUENT_BASE = 'https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets';
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, '_');

interface Icon3DProps {
  /** Fluent Emoji asset name, e.g. "Rocket", "Graduation cap" */
  name?: string;
  /** devicon path without extension, e.g. "github/github-original" */
  devicon?: string;
  size?: number;
  /** gentle levitation loop (icon-3d-float is defined in index.css) */
  float?: boolean;
  /** white-out filter — for icons sitting on dark/colored tiles */
  invert?: boolean;
  className?: string;
}

const Icon3D = ({
  name,
  devicon,
  size = 24,
  float = false,
  invert = false,
  className = '',
}: Icon3DProps) => {
  const src = devicon
    ? `${DEVICON_BASE}/${devicon}.svg`
    : `${FLUENT_BASE}/${name}/3D/${slugify(name ?? '')}_3d.png`;

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable={false}
      width={size}
      height={size}
      className={`select-none object-contain ${float ? 'icon-3d-float' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        filter: invert
          ? 'brightness(0) invert(1) drop-shadow(0 3px 5px rgba(0, 0, 0, 0.4))'
          : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.35))',
      }}
    />
  );
};

export default memo(Icon3D);