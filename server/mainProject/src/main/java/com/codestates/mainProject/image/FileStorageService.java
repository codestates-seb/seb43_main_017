package com.codestates.mainProject.image;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.image.FileStorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;



@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_URL_ERROR);
        }
    }

    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Path targetLocation = this.fileStorageLocation.resolve(fileName);

        try {
            if (fileName.contains("..")) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_URL_ERROR);
            }

                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_URL_ERROR);
        }
        return fileName;
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
            }
        } catch (MalformedURLException ex) {
            throw new BusinessLogicException(ExceptionCode.FILE_NOT_FOUND);
        }
    }
}
