package tr.com.obss.jss.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    private static final String ERR = "ERROR";
    private static final String UNKNOWN_ERR = "Unknown error has been occurred!";

    @ExceptionHandler(ArithmeticException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, ArithmeticException t){
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put(ERR, UNKNOWN_ERR);
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, IllegalArgumentException t){
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put(ERR, t.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, Throwable t){
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put(ERR, UNKNOWN_ERR);
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
