
import classes from './User.css';

export const userHtmlSkeleton = `
<div class="${classes.user__container}">
    <h2 class="${classes.user__title}">Hero</h2>
    <div class="${classes.user__avatar}">
        <img src="" alt="avatar" class="${classes['user__avatar-img']}">
        <span class="${classes['user__avatar-field']}">bio:</span>
        <span class="${classes['user__avatar-bio']}"></span>
    </div>
    <ul class="${classes.user__info}"></ul>
</div>`;