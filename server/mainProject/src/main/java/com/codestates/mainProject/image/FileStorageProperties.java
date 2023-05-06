package com.codestates.mainProject.image;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties(prefix = "file")
@Data
@Configuration
public class FileStorageProperties {
    private String uploadDir;
}

