#! /bin/sh
### BEGIN INIT INFO
# Provides:          agocontrol
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: ago control initscript
# Description:       starts core services
### END INIT INFO

# Author: Christoph Jaeger <office@diakonesis.at>

# Do NOT "set -e"

# PATH should only include /usr/* if it runs after the mountnfs.sh script
PATH=/sbin:/usr/sbin:/bin:/usr/bin
DESC="ago control core services"

# Exit if the screen is not installed
[ -x "/usr/bin/screen" ] || exit 0

#
# Function that starts the daemon/service
#
do_start()
{
	echo -n "Starting $DESC:"
	/usr/bin/screen -d -S agoresolver -m /opt/agocontrol/bin/agoresolver
	/usr/bin/screen -d -S agoadmin -m /opt/agocontrol/bin/agoadmin.py
	echo "."
}

#
# Function that stops the daemon/service
#
do_stop()
{
	echo -n "Stopping $DESC:"
	kill `/usr/bin/screen -list | grep agoresolver | tr  . " " | awk {'print$1'}`
	kill `/usr/bin/screen -list | grep agoadmin | tr  . " " | awk {'print$1'}`
	echo "."
}

case "$1" in
  start)
	do_start
	;;
  stop)
	do_stop
	;;
  *)
	echo "Usage: $SCRIPTNAME {start|stop}" >&2
	exit 3
	;;
esac

:
