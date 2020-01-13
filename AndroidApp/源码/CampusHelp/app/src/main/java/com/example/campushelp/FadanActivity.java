package com.example.campushelp;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.DatePicker;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

public class FadanActivity extends AppCompatActivity {
    private List<String> typelist=new ArrayList<>();
    private boolean clickTypelist=false;
    private TextView startTimeDayText;
    private TextView startTimeHourText;
    private TextView endTimeDayText;
    private TextView endTimeHourText;
    DateFormat format= DateFormat.getDateTimeInstance();
    Calendar calendar= Calendar.getInstance(Locale.CHINA);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN|
                WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        setContentView(R.layout.activity_fadan);



        final TextView typetext=(TextView)findViewById(R.id.typetext);
        final LinearLayout block5=(LinearLayout)findViewById(R.id.block5);
        final LinearLayout block00=(LinearLayout)findViewById(R.id.block00);
        final ScrollPickerView typeScrollView=(ScrollPickerView)findViewById(R.id.type_scroll);
        typeScrollView.setLayoutManager(new LinearLayoutManager(this));
        initTypeList();
        final ScrollPickerAdapter.ScrollPickerAdapterBuilder<String> typeBuilder =
                new ScrollPickerAdapter.ScrollPickerAdapterBuilder<String>(this)
                        .setDataList(typelist)
                        .selectedItemOffset(1)
                        .visibleItemNumber(3)
                        .setDivideLineColor("#E5E5E5")
                        .setItemViewProvider(null)
                        .setOnClickListener(new ScrollPickerAdapter.OnClickListener() {
                            @Override
                            public void onSelectedItemClicked(View v) {
                                String text = (String) v.getTag();
                                if (text != null) {
                                    typetext.setText(text);
                                    //Toast.makeText(FadanActivity.this, text, Toast.LENGTH_SHORT).show();
                                    typeScrollView.setVisibility(View.INVISIBLE);
                                    block5.setVisibility(View.VISIBLE);
                                    block00.setVisibility(View.VISIBLE);
                                }
                            }
                        });
        LinearLayout block2=(LinearLayout)findViewById(R.id.block2);
        block2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                block5.setVisibility(View.INVISIBLE);
                block00.setVisibility(View.INVISIBLE);
                if(clickTypelist)
                    typeScrollView.setVisibility(View.VISIBLE);
                else {
                    ScrollPickerAdapter mScrollPickerAdapter = typeBuilder.build();
                    typeScrollView.setAdapter(mScrollPickerAdapter);
                    clickTypelist=true;
                }
            }
        });


        LinearLayout block321=(LinearLayout)findViewById(R.id.block321);
        startTimeDayText=(TextView)findViewById(R.id.start_time_day);
        block321.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showDatePickerDialog(FadanActivity.this,  0, startTimeDayText,calendar);
            }
        });
        LinearLayout block322=(LinearLayout)findViewById(R.id.block322);
        startTimeHourText=(TextView)findViewById(R.id.start_time_hour);
        block322.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showTimePickerDialog(FadanActivity.this,  0, startTimeHourText,calendar);
            }
        });
        LinearLayout block341=(LinearLayout)findViewById(R.id.block341);
        endTimeDayText=(TextView)findViewById(R.id.end_time_day);
        block341.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showDatePickerDialog(FadanActivity.this,  0, endTimeDayText,calendar);
            }
        });
        LinearLayout block342=(LinearLayout)findViewById(R.id.block342);
        endTimeHourText=(TextView)findViewById(R.id.end_time_hour);
        block342.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showTimePickerDialog(FadanActivity.this,  0, endTimeHourText,calendar);
            }
        });

        LinearLayout block51=(LinearLayout)findViewById(R.id.block51);
        block51.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(FadanActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
        LinearLayout block53=(LinearLayout)findViewById(R.id.block53);
        block53.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(FadanActivity.this,MessageActivity.class);
                startActivity(intent);
            }
        });
        LinearLayout block54=(LinearLayout)findViewById(R.id.block54);
        block54.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent=new Intent(FadanActivity.this,AccountActivity.class);
                startActivity(intent);
            }
        });





    }

    /**
     * 日期选择
     * @param activity
     * @param themeResId
     * @param calendar
     */
    public static void showDatePickerDialog(Activity activity, int themeResId,final TextView tv,  Calendar calendar) {
        // 直接创建一个DatePickerDialog对话框实例，并将它显示出来
        new DatePickerDialog(activity, themeResId, new DatePickerDialog.OnDateSetListener() {
            // 绑定监听器(How the parent is notified that the date is set.)
            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                //tv.setText("您选择了：" + year + "年" + (monthOfYear + 1) + "月" + dayOfMonth + "日");
                tv.setText((monthOfYear + 1) + "月" + dayOfMonth + "日 ");
            }
        }
                // 设置初始日期
                , calendar.get(Calendar.YEAR)
                , calendar.get(Calendar.MONTH)
                , calendar.get(Calendar.DAY_OF_MONTH)).show();
    }
    /**
     * 时间选择
     * @param activity
     * @param themeResId
     * @param calendar
     */
    public static void showTimePickerDialog(Activity activity, int themeResId,final TextView tv,  Calendar calendar) {
        // Calendar c = Calendar.getInstance();
        // 创建一个TimePickerDialog实例，并把它显示出来
        // 解释一哈，Activity是context的子类
        new TimePickerDialog( activity,themeResId,
                // 绑定监听器
                new TimePickerDialog.OnTimeSetListener() {
                    @Override
                    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
                        //tv.setText("您选择了：" + hourOfDay + "时" + minute  + "分");
                        tv.setText(hourOfDay + ":" + minute  + "分");
                    }
                }
                // 设置初始时间
                , calendar.get(Calendar.HOUR_OF_DAY)
                , calendar.get(Calendar.MINUTE)
                // true表示采用24小时制
                ,true).show();
    }


    private void initTypeList(){
        typelist.add("取快递");typelist.add("送资料");typelist.add("求辅导");
        typelist.add("代打饭");typelist.add("办事务");typelist.add("其他");
    }


}
