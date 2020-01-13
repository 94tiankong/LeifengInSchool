package com.example.campushelp;

/**
 * Created by 董少龙 on 2019/12/6.
 */

public class Item {
    private String name;
    private String college;
    private String helpTypeStr;
    private String startTimeStr;
    private String endTimeStr;
    private String startAddr;
    private String endAddr;
    private String helpDesc;
    private Double helpReward;
    private String avatar;
    private String helpStateStr;

    public Item(String name, String college, String helpTypeStr, String startTimeStr, String endTimeStr, String startAddr, String endAddr, String helpDesc, Double helpReward,String avatar,String helpStateStr) {
        this.name = name;
        this.college = college;
        this.helpTypeStr = helpTypeStr;
        this.startTimeStr = startTimeStr;
        this.endTimeStr = endTimeStr;
        this.startAddr = startAddr;
        this.endAddr = endAddr;
        this.helpDesc = helpDesc;
        this.helpReward = helpReward;
        this.avatar=avatar;
        this.helpStateStr=helpStateStr;
    }
    public String getHelpStateStr(){return helpStateStr;}
    public String getAvatar(){
        return avatar;
    }

    public String getName() {
        return name;
    }

    public String getCollege() {
        return college;
    }

    public String getHelpTypeStr() {
        return helpTypeStr;
    }

    public String getStartTimeStr() {
        return startTimeStr;
    }

    public String getEndTimeStr() {
        return endTimeStr;
    }

    public String getStartAddr() {
        return startAddr;
    }

    public String getEndAddr() {
        return endAddr;
    }

    public String getHelpDesc() {
        return helpDesc;
    }

    public Double getHelpReward() {
        return helpReward;
    }
}
