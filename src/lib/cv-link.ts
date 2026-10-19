/**
 * The single place to set the CV PDF address. Every "Download CV" button reads it;
 * set it to "#" and those buttons disappear instead of linking nowhere.
 */
export const CV_HREF: string = "/sary-danish-cv.pdf";

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
