import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const createPagination = () => {
    const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 3;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > boundaryCount + 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - boundaryCount - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;
    const pages = [];

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = boundaryCount + siblingCount * 2 + 2;
      const leftRange = range(1, leftItemCount);
      pages.push(...leftRange, "...", lastPageIndex);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaryCount + siblingCount * 2 + 2;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      pages.push(firstPageIndex, "...", ...rightRange);
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      pages.push(firstPageIndex, "...", ...middleRange, "...", lastPageIndex);
    }

    return pages;
  };

  const paginationItems = createPagination();

  const styles = {
    nav: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      padding: "0.75rem 1rem",
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "1rem",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      border: "1px solid rgba(15, 23, 42, 0.08)",
      backdropFilter: "blur(10px)",
    },
    list: {
      display: "flex",
      gap: "0.5rem",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    button: {
      minWidth: "2.5rem",
      height: "2.5rem",
      borderRadius: "0.75rem",
      border: "1px solid transparent",
      background: "transparent",
      color: "#c2185b",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.18s ease",
    },
    activeButton: {
      background: "#c2185b",
      color: "#fff",
      border: "1px solid #c2185b",
      boxShadow: "0 6px 16px rgba(15, 23, 42, 0.16)",
    },
    hoverButton: {
      background: "rgba(15, 23, 42, 0.08)",
    },
    controlButton: {
      minWidth: "3rem",
      padding: "0 0.9rem",
      background: "#892f82",
      color: "#fff",
      border: "1px solid #892f82",
    },
    disabledButton: {
      opacity: 0.45,
      cursor: "not-allowed",
      background: "rgba(15, 23, 42, 0.08)",
      color: "#6b7280",
      border: "1px solid rgba(15, 23, 42, 0.1)",
    },
    ellipsis: {
      minWidth: "2.5rem",
      height: "2.5rem",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#6b7280",
      fontWeight: 700,
    },
  };

  const getButtonStyle = (item) => {
    const base = { ...styles.button };
    if (item === currentPage) {
      return { ...base, ...styles.activeButton };
    }
    return base;
  };

  const getControlButtonStyle = (disabled) => {
    if (disabled) {
      return { ...styles.button, ...styles.controlButton, ...styles.disabledButton };
    }
    return { ...styles.button, ...styles.controlButton };
  };

  return (
    <nav aria-label="Pagination" style={styles.nav}>
      <button
        type="button"
        style={getControlButtonStyle(currentPage === 1)}
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <ul style={styles.list}>
        {paginationItems.map((item, index) => {
          if (item === "...") {
            return (
              <li key={`ellipsis-${index}`} style={styles.ellipsis}>
                <span>...</span>
              </li>
            );
          }

          return (
            <li key={item}>
              <button
                type="button"
                style={getButtonStyle(item)}
                onClick={() => onPageChange(item)}
                aria-current={item === currentPage ? "page" : undefined}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        style={getControlButtonStyle(currentPage === totalPages)}
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
