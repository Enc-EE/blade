import { Animatable } from "./animation";
import { Blade } from "./blade";

export class Collider implements Animatable {

    constructor(private blades: Blade[], private borderRight: number, private borderBottom: number) {
    }

    public update = (timeDiff: number) => {
        for (let i = 0; i < this.blades.length; i++) {
            const blade = this.blades[i];
            if (blade.x - blade.r < 0) {
                blade.vx = - blade.vx;
                blade.x = blade.r - blade.x + blade.r;
            } else if (blade.x + blade.r > this.borderRight) {
                blade.vx = - blade.vx;
                blade.x = this.borderRight - (blade.x + blade.r - this.borderRight) - blade.r;
            }
            if (blade.y - blade.r < 0) {
                blade.vy = - blade.vy;
                blade.y = blade.r - blade.y + blade.r;
            } else if (blade.y + blade.r > this.borderBottom) {
                blade.vy = - blade.vy;
                blade.y = this.borderBottom - (blade.y + blade.r - this.borderBottom) - blade.r;
            }

            for (let j = 0; j < this.blades.length; j++) {
                if (j <= i) {
                    continue;
                }
                const blade2 = this.blades[j];
                var distanceX = blade2.x - blade.x;
                var distanceY = blade2.y - blade.y;
                var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                if (distance <= blade.r * 2) {
                    console.log("collision");
                    this.positionCorrection(distance, blade, distanceX, distanceY, blade2);
                    this.collisionV2(distanceY, distanceX, blade, blade2);
                }
            }
        }
    }

    public draw = (ctx: CanvasRenderingContext2D, width?: number, height?: number) => {
    }

    private collisionV2(distanceY: number, distanceX: number, blade1: Blade, blade2: Blade) {
        var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        var p1x = blade1.vx * 2 * blade1.m;
        var p1y = blade1.vy * 2 * blade1.m;
        var p1 = Math.sqrt(p1x * p1x + p1y * p1y);
        var p1xAngled = distanceX / distance * p1;
        var p1yAngled = distanceY / distance * p1;

        var p2x = blade2.vx * 3 * blade2.m;
        var p2y = blade2.vy * 3 * blade2.m;
        var p2 = Math.sqrt(p2x * p2x + p2y * p2y);
        var p2xAngled = -distanceX / distance * p2;
        var p2yAngled = -distanceY / distance * p2;
        blade2.vx += p1xAngled / blade2.m;
        blade2.vy += p1yAngled / blade2.m;
        blade1.vx += p2xAngled / blade1.m;
        blade1.vy += p2yAngled / blade1.m;
    }


    private collision(distanceY: number, distanceX: number, blade1: Blade, blade2: Blade) {
        var distanceRelation = distanceY / distanceX;
        if (distanceX >= 0) {
            if (distanceRelation < 1 && distanceRelation > -1) {
                var collisionAngle = Math.atan(distanceRelation);
                console.log(collisionAngle);
                var vAngleBlade1 = Math.atan(blade1.vy / blade1.vx);
                var vLengthBlade1 = Math.sqrt(blade1.vx * blade1.vx + blade1.vy * blade1.vy);
                var vAngleBlade2 = Math.atan(blade2.vy / blade2.vx);
                var vLengthBlade2 = Math.sqrt(blade2.vx * blade2.vx + blade2.vy * blade2.vy);

                var newAngle1 = 0;
                if (vAngleBlade1 > collisionAngle) {
                    newAngle1 = collisionAngle - (vAngleBlade1 - collisionAngle);
                } else {
                    newAngle1 = collisionAngle + (collisionAngle - vAngleBlade1);
                }
                var vxBlade1New = - Math.cos(newAngle1) * vLengthBlade1;
                var vyBlade1New = - Math.sin(newAngle1) * vLengthBlade1;

                blade1.vx = vxBlade1New;
                blade1.vy = vyBlade1New;
            }
            else {
                if (distanceY > 0) {
                    // bottom
                }
                else {
                    distanceRelation = distanceX / distanceY
                    var collisionAngle = Math.atan(distanceRelation);
                    console.log(collisionAngle);
                    var vAngleBlade1 = Math.atan(blade1.vy / blade1.vx);
                    var vLengthBlade1 = Math.sqrt(blade1.vx * blade1.vx + blade1.vy * blade1.vy);
                    var vAngleBlade2 = Math.atan(blade2.vy / blade2.vx);
                    var vLengthBlade2 = Math.sqrt(blade2.vx * blade2.vx + blade2.vy * blade2.vy);

                    var newAngle1 = 0;
                    if (vAngleBlade1 > collisionAngle) {
                        newAngle1 = collisionAngle - (vAngleBlade1 - collisionAngle);
                    } else {
                        newAngle1 = collisionAngle + (collisionAngle - vAngleBlade1);
                    }
                    var vxBlade1New = - Math.cos(newAngle1) * vLengthBlade1;
                    var vyBlade1New = - Math.sin(newAngle1) * vLengthBlade1;

                    blade1.vx = vxBlade1New;
                    blade1.vy = vyBlade1New;
                }
            }
        }
        else {
            if (distanceRelation < 1 && distanceRelation > -1) {
                var collisionAngle = -Math.atan(distanceRelation);
                console.log(collisionAngle);
                var vAngleBlade1 = Math.atan(blade1.vy / blade1.vx);
                var vLengthBlade1 = Math.sqrt(blade1.vx * blade1.vx + blade1.vy * blade1.vy);
                var vAngleBlade2 = Math.atan(blade2.vy / blade2.vx);
                var vLengthBlade2 = Math.sqrt(blade2.vx * blade2.vx + blade2.vy * blade2.vy);

                var newAngle1 = 0;
                if (vAngleBlade1 > collisionAngle) {
                    newAngle1 = collisionAngle - (vAngleBlade1 - collisionAngle);
                } else {
                    newAngle1 = collisionAngle + (collisionAngle - vAngleBlade1);
                }
                var vxBlade1New = Math.cos(newAngle1) * vLengthBlade1;
                var vyBlade1New = Math.sin(newAngle1) * vLengthBlade1;

                blade1.vx = vxBlade1New;
                blade1.vy = vyBlade1New;
            }
            else {
                if (distanceY > 0) {
                    // bottom
                }
                else {
                    distanceRelation = distanceX / distanceY
                    var collisionAngle = Math.atan(distanceRelation);
                    console.log(collisionAngle);
                    var vAngleBlade1 = Math.atan(blade1.vy / blade1.vx);
                    var vLengthBlade1 = Math.sqrt(blade1.vx * blade1.vx + blade1.vy * blade1.vy);
                    var vAngleBlade2 = Math.atan(blade2.vy / blade2.vx);
                    var vLengthBlade2 = Math.sqrt(blade2.vx * blade2.vx + blade2.vy * blade2.vy);

                    var newAngle1 = 0;
                    if (vAngleBlade1 > collisionAngle) {
                        newAngle1 = collisionAngle - (vAngleBlade1 - collisionAngle);
                    } else {
                        newAngle1 = collisionAngle + (collisionAngle - vAngleBlade1);
                    }
                    var vxBlade1New = - Math.cos(newAngle1) * vLengthBlade1;
                    var vyBlade1New = - Math.sin(newAngle1) * vLengthBlade1;

                    blade1.vx = vxBlade1New;
                    blade1.vy = vyBlade1New;
                }
            }
        }
    }

    private positionCorrection(distance: number, blade: Blade, distanceX: number, distanceY: number, blade2: Blade) {
        var correction = (distance - blade.r * 2) / 2;
        var correctionFactor = correction / distance;
        var correctionx = correctionFactor * distanceX;
        var correctiony = correctionFactor * distanceY;
        blade.x += correctionx;
        blade.y += correctiony;
        blade2.x -= correctionx;
        blade2.y -= correctiony;
    }
}