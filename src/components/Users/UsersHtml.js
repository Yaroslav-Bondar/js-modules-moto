import styles from './Users.css';
export const modalHtmlSkeleton = `
    <div class="wrapper__modal">
        <div class="container__modal">
            <div id="user"></div>
            <div id="repo"></div>
        </div>
        <button onclick="modal.innerHTML = ''; body.style.overflow = ''" class = "${styles['user__close']}">
            [x]
        </button>
    </div>`;

export const usersHtmlSkeleton =`
    <div class="users__container">
        <div class="users__total-count">total_count: <span class="users__total-count-item"></span></div>  
        <ul class="users__list">
        </ul>
        <button type="button" class="users__more-button" style="display=none;">Load more</button>
    </div>`;    