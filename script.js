// 헤더, 메뉴, 섹션 미리 가져오기
const siteHeader = document.getElementById("siteHeader");
const siteNav = document.getElementById("siteNav");
const menuToggle = document.getElementById("menuToggle");
const communityTrack = document.getElementById("communityTrack");

let communityMarqueeInitialized = false;

// 모바일 네비
const bindMobileMenuToggle = () => {
  if (!menuToggle) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    siteNav?.classList.toggle("is-open", isOpen);
    siteHeader?.classList.toggle("is-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
};

// 스크롤시 해더
const updateHeaderState = () => {
  siteHeader?.classList.toggle("is-solid", window.scrollY > 24);
};

// community 카드 전체가 자동으로 무한 이동
const bindCommunityMarquee = () => {
  if (!communityTrack) return;

  if (!communityMarqueeInitialized) {
    const originalCards = Array.from(communityTrack.children);

    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");

      clone.querySelectorAll("a, button, input, textarea, select, [tabindex]").forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });

      communityTrack.appendChild(clone);
    });

    communityMarqueeInitialized = true;
  }

  const originalCardCount = communityTrack.children.length / 2;
  const firstCloneCard = communityTrack.children[originalCardCount];

  if (!firstCloneCard) return;

  communityTrack.classList.remove("is-marquee");

  const loopWidth = firstCloneCard.offsetLeft;
  const duration = Math.max(loopWidth / 80, 18);

  communityTrack.style.setProperty("--community-loop-width", `${loopWidth}px`);
  communityTrack.style.setProperty("--community-marquee-duration", `${duration}s`);

  void communityTrack.offsetWidth;
  communityTrack.classList.add("is-marquee");
};

// 페이지 공통 인터랙션 한 번만
const init = () => {
  bindMobileMenuToggle();
  updateHeaderState();
  bindCommunityMarquee();

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("resize", bindCommunityMarquee);
};

init();

    /* 안내팝업 */
  const popup = document.getElementById("introPopup");
  const closeBtn = document.getElementById("popupClose");

  // 페이지 들어가면 팝업 열린 상태
  document.body.classList.add("popup-open");

  // X 버튼 누르면 팝업 닫기
  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
    document.body.classList.remove("popup-open");
  });
