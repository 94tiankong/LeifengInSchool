package com.example.campushelp;

import android.content.Intent;
import android.graphics.Color;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static android.support.v7.appcompat.R.id.scrollView;

public class MainActivity extends AppCompatActivity {
    final String token="x30vfkhatbcatauw3i4sk2vneunza2d3";
    private List<Item> itemList=new ArrayList<>();
    RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN|
                WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        //状态栏与软件融合
        //if(Build.VERSION.SDK_INT>=21){
        //    View decorView=getWindow().getDecorView();
        //    decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN|View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
        //    getWindow().setStatusBarColor(Color.TRANSPARENT);
        //}//状态栏与软件融合
        setContentView(R.layout.activity_main);
        ImageView mainImage=(ImageView)findViewById(R.id.block11) ;
        mainImage.setAdjustViewBounds(true);
        recyclerView=(RecyclerView)findViewById(R.id.recycler_view);
        LinearLayoutManager layoutManager=new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        getItemListWithHttp(handler);
        LinearLayout block52=(LinearLayout)findViewById(R.id.block52);
        block52.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this,FadanActivity.class);
                startActivity(intent);
            }
        });
        LinearLayout block53=(LinearLayout)findViewById(R.id.block53);
        block53.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this,MessageActivity.class);
                startActivity(intent);
            }
        });
        LinearLayout block54=(LinearLayout)findViewById(R.id.block54);
        block54.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(MainActivity.this,AccountActivity.class);
                startActivity(intent);
            }
        });


    }


    private void getItemListWithHttp(final Handler handler){
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection connection=null;
                BufferedReader reader=null;
                try {
                    URL url = new URL("https://xinleifeng.zhanhuwei001.com/platform/api/micro_help/list");
                    connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("POST");
                    connection.addRequestProperty("X-Nideshop-Token", token);
                    DataOutputStream out = new DataOutputStream(connection.getOutputStream());
                    //out.writeBytes("mobile=15927187883&password=123456");
                    connection.setConnectTimeout(8000);
                    InputStream in = connection.getInputStream();
                    reader = new BufferedReader(new InputStreamReader(in));
                    StringBuilder response = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        response.append(line);
                    }
                    Log.d("AAA", response.toString());
                    JSONObject jsonObject = new JSONObject(response.toString());
                    int errno = jsonObject.getInt("errno");
                    JSONObject data1 = jsonObject.getJSONObject("data");
                    JSONArray data = data1.getJSONArray("data");
                    //shan
                    for (int j = 0; j < 4; j++) {
                        for (int i = 0; i < data.length(); i++) {
                            JSONObject obj = data.getJSONObject(i);
                            String name = obj.getString("realName");
                            Log.d("EEE", name);
                            String college = obj.getString("college");
                            String helpTypeStr = obj.getString("helpTypeStr");
                            String startTimeStr = obj.getString("startTimeStr");
                            String endTimeStr = obj.getString("endTimeStr");
                            String startAddr = obj.getString("startAddr");
                            String endAddr = obj.getString("endAddr");
                            String helpDesc = obj.getString("helpDesc");
                            Double helpReward = obj.getDouble("helpReward");
                            String avatar = obj.getString("avatar");
                            String helpStateStr = obj.getString("helpStateStr");
                            Item item = new Item(name, college, helpTypeStr, startTimeStr, endTimeStr, startAddr, endAddr, helpDesc, helpReward, avatar, helpStateStr);
                            itemList.add(item);
                        }
                    }
                    Log.d("CC",itemList.get(0).getHelpReward().toString());

                    Message msg=new Message();
                    msg.what=1;
                    Bundle bundle=new Bundle();
                    bundle.putInt("errno",errno);
                    msg.setData(bundle);
                    handler.sendMessage(msg);
                }catch (Exception e){
                    e.printStackTrace();
                }finally {
                    if(reader!=null){
                        try {
                            reader.close();
                        }catch (IOException e){
                            e.printStackTrace();
                        }
                    }
                    if(connection!=null){
                        connection.disconnect();
                    }
                }
            }
        }).start();


    }

    private Handler handler=new Handler(){
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what){
                case 1:
                    int errno=msg.getData().getInt("errno");
                    if(errno==0) {
                        ItemAdapter adapter = new ItemAdapter(itemList);
                        recyclerView.setAdapter(adapter);
                    }
                    else {
                        Toast.makeText(MainActivity.this,"请先登录！",Toast.LENGTH_SHORT).show();
                    }
                    break;
            }
        }
    };






}
