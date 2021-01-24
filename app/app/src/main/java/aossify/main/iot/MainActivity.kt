package aossify.main.iot


import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebViewClient
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView.settings.javaScriptEnabled = true  // 자바 스크립트 허용
        webView.settings.domStorageEnabled = true // 로컬스토리지 허용

        // 새창 금지
        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()

        // 주소 로드
        webView.loadUrl("https://iotserver-d1f69.web.app/" )

    }

    override fun onBackPressed() { // 뒤로가기 눌렀을 때 처리
        if(webView.canGoBack()){ //웹사이트에서 뒤로갈 페이지가 존재한다면
            webView.goBack()
        }else{
            super.onBackPressed() // 본래의 백버튼 기능 수행
        }
    }
}