package com.example.campushelp;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import static android.R.attr.bitmap;

/**
 * Created by 董少龙 on 2019/12/6.
 */

public class ItemAdapter extends RecyclerView.Adapter<ItemAdapter.ViewHolder> {
    private List<Item> mItemList;
    private Bitmap bitmap;
    static class ViewHolder extends RecyclerView.ViewHolder{
        TextView name;
        TextView college;
        TextView helpTypeStr;
        TextView timeStr;
        TextView addr;
        TextView helpDesc;
        TextView helpReward;
        ImageView recycleImage;
        TextView daoJishiTime;
        TextView daoJishiText;
        Button qiangdanButton;
        ImageView yiwanchengImage;

        public ViewHolder(View view){
            super(view);
            name=(TextView)view.findViewById(R.id.item121);
            college=(TextView)view.findViewById(R.id.item131);
            helpTypeStr=(TextView)view.findViewById(R.id.item141);
            timeStr=(TextView)view.findViewById(R.id.item211);
            addr=(TextView)view.findViewById(R.id.item212);
            helpDesc=(TextView)view.findViewById(R.id.item31);
            helpReward=(TextView)view.findViewById(R.id.item411);
            recycleImage=(ImageView)view.findViewById(R.id.recycler_image);
            daoJishiTime=(TextView) view.findViewById(R.id.item431);
            daoJishiText=(TextView)view.findViewById(R.id.item432);
            qiangdanButton=(Button)view.findViewById(R.id.item441);
            yiwanchengImage=(ImageView)view.findViewById(R.id.yiwanchengImage);
        }
    }
    public ItemAdapter(List<Item> itemList){
        mItemList=itemList;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(parent.getContext()).inflate(R.layout.item,parent,false);
        ViewHolder holder=new ViewHolder(view);
        return holder;
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        Item item=mItemList.get(position);
        holder.name.setText(item.getName());
        holder.college.setText(item.getCollege());
        holder.helpTypeStr.setText(item.getHelpTypeStr());
        holder.timeStr.setText("任务时间："+item.getStartTimeStr()+" - "+item.getEndTimeStr());
        holder.addr.setText("地址："+item.getStartAddr()+" 到 "+item.getEndAddr());
        holder.helpDesc.setText("任务描述："+item.getHelpDesc()+item.getHelpDesc());
        holder.helpReward.setText("¥ "+item.getHelpReward().intValue());
        String helpStateStr=item.getHelpStateStr();
        if(helpStateStr.equals("已完成")){
            holder.daoJishiTime.setVisibility(View.INVISIBLE);
            holder.daoJishiText.setVisibility(View.INVISIBLE);
            holder.qiangdanButton.setVisibility(View.INVISIBLE);
            holder.yiwanchengImage.setImageResource(R.drawable.yiwancheng);
        }
        else if(helpStateStr.equals("抢单中")){
            holder.daoJishiTime.setVisibility(View.VISIBLE);
            holder.daoJishiText.setVisibility(View.VISIBLE);
            holder.qiangdanButton.setVisibility(View.VISIBLE);
            holder.yiwanchengImage.setVisibility(View.INVISIBLE);
        }


        Handler handler=new Handler() {
            @Override
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    case 1:
                        holder.recycleImage.setImageBitmap(bitmap);
                        break;
                }
            }
        };
        getBitMap(item.getAvatar(),handler);

    }

    public void getBitMap(final String url,final Handler handler){
        new Thread(new Runnable() {
            @Override
            public void run() {
                URL imageurl = null;
                try {
                    imageurl = new URL(url);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                try {
                    HttpURLConnection conn = (HttpURLConnection)imageurl.openConnection();
                    conn.setDoInput(true);
                    conn.connect();
                    InputStream is = conn.getInputStream();
                    //bitmap = BitmapFactory.decodeStream(is);
                    Bitmap source=BitmapFactory.decodeStream(is);
                    is.close();


                    int length = source.getWidth() < source.getHeight() ? source.getWidth() : source.getHeight();
                    Paint paint = new Paint();
                    paint.setAntiAlias(true);
                    bitmap = Bitmap.createBitmap(length, length, Bitmap.Config.ARGB_8888);
                    Canvas canvas = new Canvas(bitmap);
                    canvas.drawCircle(length / 2, length / 2, length / 2, paint);
                    paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
                    canvas.drawBitmap(source, 0, 0, paint);




                    Message msg=new Message();
                    msg.what=1;
                    Bundle bundle=new Bundle();
                    msg.setData(bundle);
                    handler.sendMessage(msg);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    @Override
    public int getItemCount() {
        return mItemList.size();
    }
}
