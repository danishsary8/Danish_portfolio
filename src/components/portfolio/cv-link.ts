/**
 * The single place to set your CV PDF address.
 *
 * Paste the URL into CV_HREF below and every CV button in the site picks it up:
 * the floating button, the desktop navbar button and the mobile navbar button.
 * Until a real URL is set, the buttons look the same but carry no link at all,
 * so no visitor ever lands on an empty "#" page.
 */
export const CV_HREF = "#";

export type CvLinkProps = {
  href?: string;
  target?: string;
  rel?: string;
  "aria-disabled"?: boolean;
  onClick?: (e: { preventDefault: () => void }) => void;
};

/**
 * CV buttons open the PDF in a new tab once a real URL is supplied.
 * While the address is still a placeholder, the element gets no href at all —
 * an anchor without one cannot navigate anywhere — and is marked disabled.
 */
export function getCvLinkProps(href: string = CV_HREF): CvLinkProps {
  const isLive = href !== "#" && href !== "";

  if (!isLive) {
    return { "aria-disabled": true, onClick: (e) => e.preventDefault() };
  }

  return { href, target: "_blank", rel: "noopener noreferrer" };
}
