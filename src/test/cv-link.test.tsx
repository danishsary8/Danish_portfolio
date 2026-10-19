import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CV_HREF, getCvLinkProps } from "@/lib/cv-link";

describe("CV buttons", () => {
  it("point at the bundled CV and open it in a new tab", () => {
    expect(CV_HREF).toBe("/sary-danish-cv.pdf");
    expect(getCvLinkProps()).toEqual({
      href: "/sary-danish-cv.pdf",
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("stay inert while the address is still a placeholder", () => {
    const props = getCvLinkProps("#");
    expect(props.href).toBeUndefined();
    expect(props["aria-disabled"]).toBe(true);
    expect(props.target).toBeUndefined();

    let prevented = false;
    props.onClick?.({ preventDefault: () => (prevented = true) });
    expect(prevented).toBe(true);

    // An anchor with no href cannot navigate, so a click can never land on "#".
    const markup = renderToStaticMarkup(<a {...props}>View CV</a>);
    expect(markup).not.toContain("href");
    expect(markup).toContain('aria-disabled="true"');
  });

  it("open the PDF in a new tab once a real URL is set", () => {
    const props = getCvLinkProps("https://example.com/sary-danish-cv.pdf");
    expect(props).toEqual({
      href: "https://example.com/sary-danish-cv.pdf",
      target: "_blank",
      rel: "noopener noreferrer",
    });
    expect(props["aria-disabled"]).toBeUndefined();

    const markup = renderToStaticMarkup(<a {...props}>View CV</a>);
    expect(markup).toContain('href="https://example.com/sary-danish-cv.pdf"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener noreferrer"');
  });
});
