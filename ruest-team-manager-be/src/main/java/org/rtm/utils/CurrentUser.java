package org.rtm.utils;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Map;


@Component
public class CurrentUser {

    public String getFullName() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            return "";
        }

        Jwt jwt = (Jwt) auth.getPrincipal();

        final Map<String, Object> claims = jwt.getClaims();

        return (String) claims.get("name");
    }
}
