import swal from 'sweetalert2';
import metamaskLogo from "../assets/img/metamask_fox.svg";

export const noMetaMaskWarning = async (account) => {
  const getMetaMaskLink = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      return {
        title: "Open in App Store",
        link: "https://metamask.app.link/bxwkE8oF99",
      };
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return {
        title: "Open in App Store",
        link: "https://metamask.app.link/skAH3BaF99",
      };
    }
    return {
      title: "Open Instructions",
      link: "https://metamask.io/download.html",
    };
  }

  if (account) return;

  const { title, link } = getMetaMaskLink();
  swal
    .fire({
      title: "You need to install metamask.",
      confirmButtonText: title,
      imageUrl: metamaskLogo,
      imageWidth: 100,
    })
    .then(({ isConfirmed }) => {
      if (isConfirmed) {
        window.open(link, "_blank").focus();
      }
    });
};

