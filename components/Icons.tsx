import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

export const Icons = {
  GitHub: ({ className, size = 20, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  LinkedIn: ({ className, size = 20, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" r="2" cy="4" />
    </svg>
  ),
  Facebook: ({ className, size = 20, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Twitter: ({ className, size = 20, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M4 4l11.733 16h4.267l-11.733-16z" />
      <path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768" />
    </svg>
  ),
  WhatsApp: ({ className, size = 24, ...props }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.001.597 1.773.817 2.806.817 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.766-5.767-5.766zm3.374 8.163c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.107-.059-.441-.148-1.026-.35-1.782-.676-1.309-.564-2.164-1.89-2.23-1.977-.065-.088-.535-.711-.535-1.356 0-.645.338-.962.459-1.093.12-.13.261-.163.348-.163.088 0 .175.001.25.005.079.004.186-.03.29.22.109.261.371.903.404.969.033.066.054.142.011.23-.044.088-.066.142-.131.218-.065.076-.138.17-.197.228-.065.066-.134.137-.058.268.076.131.338.558.725.903.498.444.919.581 1.05.646.131.066.208.055.284-.033.076-.088.328-.382.415-.513.088-.131.175-.109.295-.065.12.044.765.36 8.96.426.131.066.218.098.25.153.033.055.033.317-.111.722z" />
      <path d="M12.004 2c-5.518 0-9.998 4.476-9.998 9.994 0 1.764.46 3.421 1.264 4.869l-1.27 4.637 4.757-1.248a9.948 9.948 0 0 0 5.247 1.472c5.518 0 9.996-4.477 9.996-9.994 0-5.518-4.478-9.994-9.996-9.994zm0 18.219c-1.536 0-2.986-.426-4.238-1.168l-.304-.18-3.149.826.841-3.07-.198-.315a8.211 8.211 0 0 1-1.258-4.313c0-4.542 3.696-8.238 8.306-8.238 4.608 0 8.304 3.696 8.304 8.238 0 4.542-3.696 8.22-8.306 8.22z" />
    </svg>
  ),
};
