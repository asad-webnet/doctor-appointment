package com.tekbasic.doctorapp.aspects;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.hibernate.mapping.Join;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;

@Slf4j
@Aspect
@Component
public class LoggerAspects {
    @Around("execution(* com.tekbasic.doctorapp..*.*(..))")
    public Object log(ProceedingJoinPoint jp) throws Throwable {
        log.info(jp.getSignature().toString() + " method execution starts");
        Instant start = Instant.now();
        Object retObj = jp.proceed();
        Instant finish = Instant.now();

        long timeTaken = Duration.between(start,finish).toMillis();

        log.info("Time taken to execute "+jp.getSignature().toString() + " method is : " + timeTaken);
        log.info(jp.getSignature().toString() + " method execution end");
        return retObj;

    }

    @AfterThrowing(value = "execution(* com.tekbasic.doctorapp.*.*(..))", throwing = "ex")
    public void logException(JoinPoint jp,Exception ex) {
        log.error(jp.getSignature() + " An exception happened due to : " + ex.getMessage());
    }
}
