

import {API_URL_DOUBLE_GROUP_IDENTIFIER, API_URL_VALUE_IDENTIFIER, 
        API_URL_KEY_IDENTIFIER, 
        API_URL_SIMPLE_GROUP_IDENTIFIER} from '../../constants/api/apiUrlIdentifier';
import * as API_URL_QUALIFIER from '../../constants/api/apiUrlQualifier';
import {API_URL_SORT_PARAMETER, API_URL_ORDER_PARAMETER} from '../../constants/api/apiUrlParameter';
import {API_URL_ASC_VALUE, API_URL_DESC_VALUE, API_URL_FOLLOWERS_VALUE, 
        API_URL_REPOSITORIES_VALUE} from '../../constants/api/apiUrlValue';

export const htmlForm = `
<form name="users" role="search">
    <fieldset name="user_search${API_URL_DOUBLE_GROUP_IDENTIFIER}">
        <legend>required user data</legend>

        <label for="form__user">user</label>
        <input value='marina' type="text" id="form__user" name="user" data-identifier=${API_URL_VALUE_IDENTIFIER} placeholder="Search user by login..."
        aria-label="Search user by name">

        <select id="user-search-type" name="user-search-type" data-identifier=${API_URL_KEY_IDENTIFIER}>
            <option value="${API_URL_QUALIFIER.API_URL_INNAME_QUALIFIER}" selected>INNAME</option>
            <option value="${API_URL_QUALIFIER.API_URL_FULLNAME_QUALIFIER}">FULLNAME</option>
            <option value="${API_URL_QUALIFIER.API_URL_INLOGIN_QUALIFIER}">INLOGIN</option>
            <option value="${API_URL_QUALIFIER.API_URL_USER_QUALIFIER}">NAME</option>
            <option value="${API_URL_QUALIFIER.API_URL_INEMAIL_QUALIFIER}">INEMAIL</option>
        </select>
            
    </fieldset>
    <fieldset name="ddf${API_URL_SIMPLE_GROUP_IDENTIFIER}">
        <label for="location">From this location</label>
        <input value="ukraine" type="text" id="location" data-identifier=${API_URL_QUALIFIER.API_URL_LOCATION_QUALIFIER} name="location"
        placeholder="Ukraine Kyiv Odessa"
        aria-label="Search user by location">

        <label for="language">Language : </label>
        <select id="language" name="language" data-identifier=${API_URL_QUALIFIER.API_URL_LANGUAGE_QUALIFIER}>
            <option value="">none</option>
            <option value="javascript" selected>Java Script</option>
            <option value="C">c</option>
            <option value="ruby">Ruby</option>
            <option value="kotlin">kotlin</option>
        </select>
        <label for="followers">With this many followers</label>
        <input value="" type="text" id="followers" data-identifier=${API_URL_QUALIFIER.API_URL_FOLLOWERS_QUALIFIER} name="followers"
        placeholder="20..50, >200, <2"
        aria-label="With this many followers">

        <label for="repositories">With this many public repositories</label>
        <input value="" type="text" id="repositories" data-identifier=${API_URL_QUALIFIER.API_URL_REPOS_QUALIFIER} name="repositories"
        placeholder="0, <42, >5"
        aria-label="With this many repositories">

        <label for="sort-by">Sort-by</label>
        <select id="sort-by" name="sort-by" data-identifier=${API_URL_SORT_PARAMETER}>
            <option value="${API_URL_REPOSITORIES_VALUE}">repositories</option>
            <option value="${API_URL_FOLLOWERS_VALUE}" selected>followers</option>
        </select>
        <label for="order">order</label>
        <select id="order" name="order" data-identifier=${API_URL_ORDER_PARAMETER}>
            <option value="${API_URL_DESC_VALUE}" selected>descending</option>
            <option value="${API_URL_ASC_VALUE}">ascending</option>
        </select>
    </fieldset>    
    <button value="submit">submit</button>
</form>`;

